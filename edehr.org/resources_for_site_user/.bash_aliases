# To be appended to user shell profile
# customAliases
alias gitlog='git log --graph --oneline --decorate --all'
alias gitls='git show --pretty="" --name-only '
alias h='history'
# long format, all, flagged
alias ll='ls -alF'
alias cdde="cd /opt/edehr/project/deployment"
alias cdcl="cd /opt/edehr/project/client"
alias cdsc="cd /opt/edehr/scripts"
alias cde="cd /opt/edehr/"
alias dps="docker ps"
alias dils="docker image ls"
alias dcls="docker container ls"
alias di="docker image "
alias dc="docker container "
alias envs='env | sort'
alias export_env='set -o allexport; source .env; set +o allexport'
alias denv='source /opt/edehr/scripts/scripts_edehr/edehr_docker_containers_env.sh'
