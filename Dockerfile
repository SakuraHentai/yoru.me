# Ref: https://nextjs.org/docs/deployment#docker-image
# Install dependencies only when needed
FROM node:16.20.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN yarn global add pnpm@8.3.1 && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16.20.0-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:16.20.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -S nodejs -g 1001
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# posts and demos in runtime
COPY --from=builder --chown=nextjs:nodejs /app/_posts ./_posts
COPY --from=builder --chown=nextjs:nodejs /app/_demos ./_demos
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]