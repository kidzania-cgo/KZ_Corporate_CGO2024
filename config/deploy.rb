# config valid only for current version of Capistrano
#lock "3.8.2"
set :stages, ["production"]

set :application, "kidzania_corporate"
set :repo_url, 'git@github.com:kidzania-cgo/corporate.git'

set :branch, fetch(:branch, 'release')
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/mnt/app/"

set :linked_dirs, %w(node_modules)

namespace :angular do
	task :start_the_app do
		on roles(:app) do
	   	  execute "cd #{release_path}; npm install "
	      execute "cd #{release_path}; npm run build"
    	end
  	end
end

after "deploy:updated", "angular:start_the_app"
