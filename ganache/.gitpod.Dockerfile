FROM node:16

# Ganache CLI 설치
RUN npm install -g ganache-cli

# 프로젝트 디렉토리 설정
WORKDIR /workspace/ganache-project

