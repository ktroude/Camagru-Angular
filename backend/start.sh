#!/bin/bash

/wait-for-it.sh database:5432 -t 60

npx prisma generate
npx prisma migrate dev

npm run start:dev