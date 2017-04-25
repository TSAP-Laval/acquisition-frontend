# acquisition-frontend

![CircleCI](https://circleci.com/gh/TSAP-Laval/acquisition-frontend.svg?style=shield)
![Coverage Status](https://coveralls.io/repos/github/TSAP-Laval/acquisition-frontend/badge.svg)
[![CodeFactor](https://www.codefactor.io/repository/github/tsap-laval/acquisition-frontend/badge)](https://www.codefactor.io/repository/github/tsap-laval/acquisition-frontend)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/92eb77ccf6dc4682a4000c7a6ce2841f)](https://www.codacy.com/app/laurentlp/acquisition-frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=TSAP-Laval/acquisition-frontend&amp;utm_campaign=Badge_Grade)
[![Code Climate](https://codeclimate.com/repos/58e830530ea2e20296000fa4/badges/9561cadf74b1df060d0c/gpa.svg)](https://codeclimate.com/repos/58e830530ea2e20296000fa4/feed)
[![Issue Count](https://codeclimate.com/repos/58e830530ea2e20296000fa4/badges/9561cadf74b1df060d0c/issue_count.svg)](https://codeclimate.com/repos/58e830530ea2e20296000fa4/feed)

## Création de la structure du projet

### Package utilisés

                  - create-react-app (d'autres packages seront inclus tel que le Webpack)
                  - react-create (pour la création de component)


### Commandes

  Installer les packages :

                  - create-react-app: npm install -g create-react-app
                  - react-create: npm install -g react-create


  Créer le projet react :

                  - create-react-app [Nom_projet]
  Lancer le projet :

                  - cd [Nom_projet]
                  - npm start

  Créer un nouveau component :

                  Usage: react-create component <component name> [options]

                  Actions:
                    comp, component            Passed in as first argument to signify component creation

                  Options:
                    -v, --version              Outputs the version number (e.g rc -v)
                    -h, --help                 Prints out usage options
                    -d, --dir                  Creates a [component name] directory with component file inside. (Default is just the                                                    component file)
                    -p, --pkg                  Includes a package.json file with component
                    --es5                      Generates the component with React's ES5 syntax. (Default is ES6).
                    --jsx                      Creates the component with `.jsx` extenstion. (Default is `.js`)
                    --entry                    Bootstraps the component with the 'ReactDOM.render' function.
                    --css,--styl,--less, -scss Create and choose your css preprocessor to generate

  Template pris pour ce projet :

                   - react-create component <nom_component> --jsx --css


  Template pris pour ce projet :

                   - react-create component <nom_component> --jsx --css


## Configurations de l'environnement de développement

### Prérequis

* Python
* Yarn (npm install -g yarn)
* webpack (npm install -g webpack ou yarn add webpack)

#### Lors du développement exécuter

```shell
$ python -m SimpleHTTPServer (dans le dossier /dist du projet)
```

```shell
$ webpack --watch (dans un autre terminal)
```


## Linting avec TSLint

### Prérequis

* TSLint (npm install -g tslint)
* TSLint (dans VSCode, installer le plugin TSLint)

#### Linting
Simplement linter le code avant chacun des push, sans quoi les PR seront rejetées...


## Tests avec Karma

### Prérequis

* Karma (npm install -g karma)
* Yarn (npm install -g yarn)
* webpack (npm install -g webpack ou yarn add webpack)

#### Pour tester exécuter

~```$ karma start tests/karma.conf.js```~

```$ npm test```
