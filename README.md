# react-nest-crud

React front end using tailwind paired with nest js/node + express for real time contact updates

## System Dependencies

Must have version of Docker installed on host device

Node 18 or greater required to run both UI and server applications independently on device

## Launching using docker container

### Quick launch

From the root of the project, run `cp .env.example .env && docker-compose up --build`

### Port customization

1. Make a copy of the `.env.example` and name it `.env` in the root of the project.
2. Adjust the ports and postgresDB credentials to your satisfaction
3. In the `./apps/ui/Dockerfile` adjust the port for hot reload on line 15 to match what's in the `.env`
4. Run `docker-compose up --build`
5. Navigate to `http://localhost:{configured-frontend-port}` to start the application UI
