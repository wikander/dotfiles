#!/bin/sh

## Shortcuts
ln -s /Library/Projects/ ~/projects

## Config
ln -s ~/dotfiles/zsh/.zshrc ~/.zshrc
ln -s ~/dotfiles/zsh/.hushlogin ~/.hushlogin

## Programs/scripts
ln -s ~/dotfiles/bin/maven-install-no-test.sh /usr/local/bin/mcint
ln -s ~/dotfiles/bin/maven-install.sh /usr/local/bin/mcit

ln -s ~/dotfiles/bin/todo.sh /usr/local/bin/todo
ln -s ~/dotfiles/bin/clear-desktop.sh /usr/local/bin/clearDesk
ln -s ~/dotfiles/bin/unclear-desktop.sh /usr/local/bin/unClearDesk
ln -s ~/dotfiles/bin/start-cq.sh /usr/local/bin/startCq

ln -s ~/dotfiles/git/.gitignore ~/dotfiles/

ln -s ~/dotfiles/sublime/.jsbeautifyrc ~
