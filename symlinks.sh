#!/bin/sh

## Shortcuts
ln -s /Library/Projects/ ~/projects

## Config
ln -s ~/dotfiles/zsh/.zshrc ~/.zshrc
ln -s ~/dotfiles/zsh/.hushlogin ~/.hushlogin

## Programs/scripts
ln -s ~/dotfiles/bin/todo.sh /usr/local/bin/todo
ln -s ~/dotfiles/bin/clear-desktop.sh /usr/local/bin/clearDesk
ln -s ~/dotfiles/bin/unclear-desktop.sh /usr/local/bin/unClearDesk

ln -s ~/Projects/dotfiles/bin/start-mockserver.sh /usr/local/bin/startMockserver
ln -s ~/Projects/dotfiles/bin/generate-mock.sh /usr/local/bin/generateMock

ln -s ~/Projects/dotfiles/bin/relink-cl.sh /usr/local/bin/relinkCl

ln -s ~/dotfiles/git/.gitignore ~/dotfiles/
