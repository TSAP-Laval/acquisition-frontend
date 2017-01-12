
# acquisition-frontend


## Création de la structure du projet :

#### Package utilisés : 
                  - create-react-app (d'autres packages seront inclus tel que le Webpack)
                  - react-create (pour la création de component)
                  
                 
#### Commandes : 
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

  
                    ```
                    
  Template pris pour ce projet :
  
                   ```- react-create component <nom_component> --jsx --css```


## Configurations de l'environnement de développement

### Prérequis
* Python
* Yarn (npm install -g yarn)
* webpack (npm install -g webpack ou yarn add webpack)

##### Lors du développement exécuter :
```$ python -m SimpleHTTPServer (dans le dossier /dist du projet)```

```$ webpack --watch (dans un autre terminal)```
