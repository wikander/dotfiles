export ZSH="$HOME/.oh-my-zsh"
export PATH="$PATH:/usr/local/mysql/support-files:~/.dotnet/tools"
ZSH_THEME="robbyrussell"
plugins=(git)

source $ZSH/oh-my-zsh.sh

alias ls='ls -lAh'
alias wwwServe='f() { python3 -m http.server 8080 };f'

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='emacs -nw'
else
  export EDITOR='emacs -nw'
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export SSLKEYLOGFILE="~/.mitmproxy/sslkeylogfile.txt"