/*
 * Copyright 2014-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*mgr*/
let mgr = process.env.MGR_PATH
let allPath = ''
// let href = `${window.location.protocol}//${window.location.host}`
// console.log(href)
// let hrefArr = window.location.href.split(href)
// console.log(hrefArr[1])
// let hrefpath = hrefArr[1].split('/')
// console.log(hrefpath)
// allPath = `${href}/${hrefpath[1]}/${hrefpath[2]}`
// console.log(allPath)
// console.log(`${allPath}${mgr}/BaaS-Node-Manager`)
let path = window.location.href
allPath = path.split('#')[0]
allPath.substr(allPath.length - 1, 1)
allPath = allPath.substr(0, allPath.length - 1)
// console.log(allPath)
export default {
    ORG_LIST: `${allPath}`,
    // ORG_LIST: `${allPath}${mgr}/BaaS-Node-Manager`
}