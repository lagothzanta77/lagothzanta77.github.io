#!/bin/bash

git config --global user.name 'Github Actions Bot'
git config --global user.email 'lagothzanta777@users.noreply.github.com'

git log -n 5 --pretty=format:"%h - %s - %ad" --date=short > changelog-hunglish.txt
git add changelog-hunglish.txt
git commit --amend --no-edit
git push --force
