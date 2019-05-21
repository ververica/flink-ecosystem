/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.flink.community;

import org.apache.flink.community.model.Comment;
import org.apache.flink.community.model.FCPackage;
import org.apache.flink.community.model.Release;
import org.apache.flink.community.service.CommentService;
import org.apache.flink.community.service.FCPackageService;
import org.apache.flink.community.service.ReleaseService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/packages")
public class FCPackageController {
	private final static Logger LOG = LoggerFactory.getLogger("FCPackageController");

	@Autowired
	private FCPackageService packageService;

	@Autowired
	private CommentService commentService;

	@Autowired
	private ReleaseService releaseService;

	@RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/json")
	public String getTeams() throws JsonProcessingException {
		System.out.println("Come here");
		List<FCPackage> packages = packageService.findAllPackages();
		return new ObjectMapper().writeValueAsString(packages);
	}

	@RequestMapping(value = "{inputPackage}", method = RequestMethod.GET, produces = "application/json")
	public String getPackage(@PathVariable("inputPackage") String packId) throws JsonProcessingException {

		FCPackage pack = packageService.findPackageById(packId);
		return new ObjectMapper().writeValueAsString(pack);
	}

	@RequestMapping(value = "{updatePackage}", method = RequestMethod.PATCH, produces = "application/json")
	public String updatePackage(@PathVariable("updatePackage") String packName,
								@RequestBody FCPackage pack) {
		FCPackage old = packageService.findPackageByName(packName);
		packageService.savePackage(old.update(pack));
		return old.toString();
	}

	@RequestMapping(value = "{deletePackage}", method = RequestMethod.DELETE, produces = "application/json")
	public String deletePackage(@PathVariable("deletePackage") String packName) {
		FCPackage old = packageService.findPackageByName(packName);
		old.setValid(false);
		packageService.savePackage(old);
		return "delete";
	}

	@RequestMapping(value = "/", method = RequestMethod.POST, produces = "application/json")
	public String addPackage(@RequestBody FCPackage pack) {
		System.out.println("add package" + pack);
		packageService.savePackage(pack);
		return "add package " + pack;
	}

	// endpoints for comments

	@RequestMapping(value = "{pkg}/comments", method = RequestMethod.GET, produces = "application/json")
	public String getComments(
			@PathVariable("pkg") String pkgId,
			@RequestParam Integer pageId) throws JsonProcessingException {
		System.out.println("Come here" + pkgId + ":" + pageId);
		List<Comment> comments = commentService.findCommentForPackage(pkgId);
		int startIdx = (pageId - 1) * 25;
		int endIdx = pageId * 25;
		int allComments = comments.size();
		List<Comment> result;
		if (startIdx >= allComments || endIdx < 0) {
			result = Collections.emptyList();
		} else {
			try {
				result = comments.subList(startIdx, Math.min(endIdx, allComments));
			} catch (IndexOutOfBoundsException e) {
				LOG.warn("Get comment for {} page {} error, allComments {}.", pkgId, pageId, allComments, e);
				result = Collections.emptyList();
			}
		}
		return new ObjectMapper().writeValueAsString(result);
	}

	@RequestMapping(value = "{pkg}/comments", method = RequestMethod.POST)
	public void addComment(
			@PathVariable("pkg") String pkgId,
			@RequestBody Comment newComment) {
		System.out.println("Add comment" + pkgId);
		commentService.saveComment(newComment);
	}

	@RequestMapping(value = "{pkg}/comments/{comment_id}", method = RequestMethod.PATCH)
	public void updateComment(
			@PathVariable("pkg") String pkgId,
			@PathVariable("comment_id") Integer cid,
			@RequestBody Comment newComment) {
		Comment old = commentService.findCommentById(cid);
		commentService.saveComment(old.update(newComment));
		System.out.println("update comment");

	}

	@RequestMapping(value = "{pkg}/comments/{comment_id}", method = RequestMethod.DELETE)
	public void deleteComment(
			@PathVariable("pkg") String pkgId,
			@PathVariable("comment_id") Integer cid) {
		Comment old = commentService.findCommentById(cid);
		old.setValid(false);
		commentService.saveComment(old);
		System.out.println("del comment");
	}


	// endpoints for release
	@RequestMapping(value = "{pkg}/releases", method = RequestMethod.GET, produces = "application/json")
	public String getReleases() throws JsonProcessingException {
		System.out.println("Come here release");
		List<Release> releases = releaseService.findAllReleases();
		return new ObjectMapper().writeValueAsString(releases);
	}

	@RequestMapping(value = "{pkg}/releases", method = RequestMethod.POST)
	public void addRelease(
			@PathVariable("pkg") String packName,
			@RequestBody Release newRelease) {
		System.out.println("Add release");
		releaseService.saveRelease(newRelease);
	}

	@RequestMapping(value = "{pkg}/releases/{release_id}", method = RequestMethod.PATCH)
	public void updateRelease(
			@PathVariable("pkg") String pkgId,
			@PathVariable("release_id") Integer rid,
			@RequestBody Release newRelease) {
		Release old = releaseService.findReleaseById(rid);
		releaseService.saveRelease(old.update(newRelease));
		System.out.println("update release");

	}

	@RequestMapping(value = "{pkg}/releases/{release_id}", method = RequestMethod.DELETE)
	public void deleteRelease(
			@PathVariable("pkg") String pkgId,
			@PathVariable("release_id") Integer rid) {
		Release old = releaseService.findReleaseById(rid);
		old.setValid(false);
		releaseService.saveRelease(old);
		System.out.println("del release");
	}
}

