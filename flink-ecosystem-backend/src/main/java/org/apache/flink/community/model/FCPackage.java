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

package org.apache.flink.community.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "fcpackage")
public class FCPackage {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String id;

	private String name;

	private String description;

	private String websiteUrl;

	private String repoUrl;

	private String license;

	private Boolean valid = true;

	public FCPackage update(FCPackage other) {
		if (other.name != null) {
			this.name = other.name;
		}

		if (other.description != null) {
			this.description = other.description;
		}

		if (other.websiteUrl != null) {
			this.websiteUrl = other.websiteUrl;
		}

		if (other.repoUrl != null) {
			this.repoUrl = other.repoUrl;
		}

		if (other.license != null) {
			this.license = other.license;
		}
		return this;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setValid(Boolean valid) {
		this.valid = valid;
	}

	@Override
	public String toString() {
		return "Package: {" +
				"id: " + id +
				"name: " + name +
				"description: " + description +
				"websiteUrl: " + websiteUrl +
				"repoUrl: " + repoUrl +
				"license: " + license +
				"}";
	}
}

