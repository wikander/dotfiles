#!/bin/sh

## Shortcuts
ln -s /Library/Projects/ ~/projects
ln -s /Library/WebServer/Documents/ ~/wwwRoot

## Config
ln -s ~/dotfiles/zsh/.zshrc ~/.zshrc
ln -s ~/dotfiles/zsh/.hushlogin ~/.hushlogin

## Programs/scripts
ln -s ~/dotfiles/bin/todo.sh /usr/local/bin/todo
ln -s ~/dotfiles/bin/clear-desktop.sh /usr/local/bin/clearDesk
ln -s ~/dotfiles/bin/unclear-desktop.sh /usr/local/bin/unClearDesk
<<<<<<< HEAD
ln -s ~/dotfiles/bin/start-cq.sh /usr/local/bin/startCq
ln -s ~/dotfiles/bin/log-cq.sh /usr/local/bin/logCq
ln -s ~/dotfiles/bin/rebuild-pwa.sh /usr/local/bin/rebuildPwa
ln -s ~/dotfiles/bin/pwaDevserver.sh /usr/local/bin/pwaDevserver
ln -s ~/dotfiles/bin/build-ts-colors.sh /usr/local/bin/buildTsColors
ln -s ~/dotfiles/bin/new-ng-app.sh /usr/local/bin/newNgApp
=======
>>>>>>> c9b537d3e5ff70bf296c041dbff379e16e4f7118

ln -s ~/Projects/dotfiles/bin/start-mockserver.sh /usr/local/bin/startMockserver
ln -s ~/Projects/dotfiles/bin/generate-mock.sh /usr/local/bin/generateMock

<<<<<<< HEAD
ln -s ~/dotfiles/sublime/.jsbeautifyrc ~



git config --global alias.plg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
=======
ln -s ~/Projects/dotfiles/bin/relink-cl.sh /usr/local/bin/relinkCl

ln -s ~/dotfiles/git/.gitignore ~/dotfiles/
>>>>>>> c9b537d3e5ff70bf296c041dbff379e16e4f7118
