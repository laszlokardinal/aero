tmux new-session -d -s "asura" -n "git"
tmux send-keys 'while true; do clear; git log --all --oneline --remotes --branches --decorate --graph --color | head -n `tput lines`; sleep 2; done' C-m
tmux split-window -h

tmux new-window -t "asura" -n "development"
tmux send-keys 'clear; npm run test:watch' C-m
tmux split-window -h
tmux send-keys 'clear; npm run format:watch' C-m
tmux split-window -v

tmux select-window -t "asura:0"

tmux attach -t "asura"
