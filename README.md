# Next.js + Electron dev/build env for Docker

## Set up

1. Install X windows server on host.

    Do it in your most preferable way.
    The server should not be access-controlled.

1. Compose-up dev compose

    ```shell
    cd .devcompose
    docker-compose up
    # While building up image, it downloads around 200MB of assets.
    # (fonts, x-client, electron deps(shared libs used by chromium seemingly.))
    ```

1. Attach vscode to the container
1. `yarn` in project root

    This project basically recommends use of `yarn`

1. Tada

    `yarn dev` to check if it works.

## Dev container

`ubuntu`:20.04 + `Node.js` 16.x

Has start script `start.sh`. This script runs every time container starts.
