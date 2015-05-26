## Shortcuts
ln -s /Library/Projects/Linda/devops/development/scripts ~/scripts
ln -s /Library/Projects/ ~/projects
ln -s /Library/Projects/git ~/projects-git
ln -s /export/wildfly_installations/local/standalone/deployments ~/deployments

## Dotfiles used in context
# maxm-standalone tweaked for start_jboss alias
rm /export/wildfly_installations/local/bin/maxm-standalone.sh 
ln -s ~/dotfiles/maxm/maxm-standalone.sh /export/wildfly_installations/local/bin


ln -s ~/dotfiles/maxm/deploydevConfigMine.sh /Library/Projects/Linda/devops/development/scripts/deploydevConfigMine.sh

# maxm.properties configurations. DataSources etc.
rm /export/wildfly_installations/local/bin/maxm.properties
ln -s ~/dotfiles/maxm/hidden-git/maxm.properties /export/wildfly_installations/local/bin/maxm.properties
# SYS
# ln -s ~/dotfiles/maxm/hidden-git/maxm-sys.properties /export/wildfly_installations/local/bin/maxm.properties

ln -s ~/Documents/.dotfiles/.profile ~/.profile
ln -s ~/Documents/dotfiles/zsh/.zshrc ~/.zshrc

## Programs/scripts
ln -s /Library/Projects/Linda/devops/development/scripts/deploydev.sh /usr/local/bin/deployDev
ln -s /Library/Projects/Linda/devops/development/scripts/cleandev.sh /usr/local/bin/cleanDev
ln -s ~/dotfiles/maxm/start-jboss.sh /usr/local/bin/startJboss
ln -s ~/dotfiles/maxm/maven-install-no-test.sh /usr/local/bin/mcint
ln -s ~/dotfiles/maxm/maven-install.sh /usr/local/bin/mcit
ln -s ~/dotfiles/maxm/maven-acc-test.sh /usr/local/bin/macc
ln -s ~/dotfiles/maxm/maven-acc-build.sh /usr/local/bin/macc-build
ln -s ~/dotfiles/maxm/start-fitnesse-pcexport.sh /usr/local/bin/startFitnessePcexport
ln -s ~/dotfiles/maxm/kill-fitnesse-server.sh /usr/local/bin/killFitnesseServer
ln -s ~/dotfiles/maxm/new_kun_db.sh /usr/local/bin/newKundDb

ln -s ~/dotfiles/bin/todo.sh /usr/local/bin/todo

ln -s ~/dotfiles/git/.gitignore ~/dotfiles/

ln -s ~/dotfiles/sublime/.jsbeautifyrc ~

