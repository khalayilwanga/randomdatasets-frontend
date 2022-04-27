# RandomDatasets frontend

This is the react frontend to the RandomDatasets project found [here]().

It utilizes redux for state management, is primarily built with fuctional components and react hooks, uses ChartJS for graphing and Bootstrap for styling some components.

## Dockerfile

In order to build the image for the frontend you can use:  
`docker build -t image-name:image-version . `

or to pull the already built image you can use:
`docker pull truphenak/randomdatasets-react-frontend:1.0.0`
