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

import org.apache.flink.community.model.FCPackage;
import org.apache.flink.community.service.FCPackageService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/packages")
public class FCPackageController {
	@Autowired
	private FCPackageService packageService;

	@RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/json")
	public String getTeams() throws JsonProcessingException {
		System.out.println("Come here");
		List<FCPackage> packages = packageService.findAllPackages();
		return new ObjectMapper().writeValueAsString(packages);
	}

	@RequestMapping(value = "{inputPackage}", method = RequestMethod.GET, produces = "application/json")
	public String getPackage(@PathVariable("inputPackage") Integer packId) throws JsonProcessingException {

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
}

