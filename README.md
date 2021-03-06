
# FHIR Loader Helper
Typescript / Javascript library that load FHIR specifications from files, zip or from website 
It currently works with R4 specifications of FHIR

[![npm version](https://badge.fury.io/js/%40ahryman40k%2Ffhir-spec-loader.svg)](https://badge.fury.io/js/%40ahryman40k%2Ffhir-spec-loader.svg)
[![Build Status](https://travis-ci.com/Ahryman40k/fhir-spec-loader.svg)](https://travis-ci.com/Ahryman40k/fhir-spec-loader)
[![codecov](https://codecov.io/gh/Ahryman40k/fhir-spec-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/Ahryman40k/fhir-spec-loader)
[![Known Vulnerabilities](https://snyk.io/test/github/Ahryman40k/fhir-spec-loader/badge.svg)](https://snyk.io/test/github/Ahryman40k/fhir-spec-loader) 
[![Project dependencies overview(Beta)](https://david-dm.org/ahryman40k/fhir-spec-loader.svg)]() 
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)


## Installation
```
npm i -S @ahryman40k/fhir-spec-loader
```
or
```
yarn install @ahryman40k/fhir-spec-loader
```


## Examples
```typescript
import { Loader } from '@ahryman40k/fhir-spec-loader'

const service = FromFiles([
                path.join(__dirname, './R4/definition/profiles-resources.json'),
            ]);

```


---
Please don't hesitate to give me advices and feedback !


