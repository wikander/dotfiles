## Shortcuts
ln -s /Library/Projects/Linda/devops/development/scripts ~/scripts
ln -s /Library/Projects/ ~/projects
ln -s /Library/Projects/git ~/projects-git
ln -s /export/jboss7_installations/local/ /export/jboss7_installations/default-node
ln -s /export/jboss7_installations/default-node/standalone/deployments ~/deployments

## Dotfiles used in context
# maxm-standalone tweaked for start_jboss alias
ln -s ~/dotfiles/maxm/maxm-standalone.sh /export/jboss7_installations/default-node/bin/

# standalone-maxm.xml configurations. DataSources etc.
ln -s ~/dotfiles/maxm/standalone-maxm.xml /export/jboss7_installations/default-node/standalone/configuration

ln -s ~/Documents/.dotfiles/.profile ~/.profile
ln -s ~/Documents/dotfiles/zsh/.zshrc ~/.zshrc

## Programs/scripts
ln -s /Library/Projects/Linda/devops/development/scripts/deploydev.sh /usr/local/bin/deployDev
ln -s /Library/Projects/Linda/devops/development/scripts/cleandev.sh /usr/local/bin/cleanDev
ln -s ~/dotfiles/maxm/start-jboss.sh /usr/local/bin/startJboss
ln -s ~/dotfiles/maxm/maven-install-no-test.sh /usr/local/bin/mcint
ln -s ~/dotfiles/maxm/maven-install.sh /usr/local/bin/mcit

ln -s ~/dotfiles/bin/todo.sh /usr/local/bin/todo

ln -s ~/dotfiles/git/.gitignore ~/dotfiles/

