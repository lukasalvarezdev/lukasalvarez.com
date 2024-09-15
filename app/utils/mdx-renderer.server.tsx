import { bundleMDX } from 'mdx-bundler';

const mdxSource = `
---
title: Example Post
published: 2021-02-13
description: This is some description
---

# Wahoo


`.trim();

const result = await bundleMDX({ source: mdxSource });

const { code } = result;

export { code };
