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

package org.apache.flink.community.service;

import org.apache.flink.community.dao.FCPackageDao;
import org.apache.flink.community.model.FCPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FCPackageService {
	@Autowired
	private FCPackageDao packageDao;

	public FCPackage findPackageById(String id) {
		return packageDao.findPackageById(id);
	}

	public FCPackage findPackageByName(String name) {
		return packageDao.findPackageByName(name);
	}

	public List<FCPackage> findAllPackages() {
		return packageDao.findAllTeams();
	}

	public FCPackage savePackage(FCPackage pack) {
		return packageDao.save(pack);
	}
}

