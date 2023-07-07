FROM mcr.microsoft.com/devcontainers/typescript-node:0-20

RUN sudo apt-get update && \
    sudo apt-get install -y \
        libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 \
        libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
        libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2

COPY .devc-tools/ /.devc-tools/
