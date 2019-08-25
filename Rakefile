task "install" do
  exec("yarn install")
end

task "reinstall" do
  exec("rm -fr ./node_modules; yarn install")
end

task "update" do
  exec("ncu")
end

task "upgrade" do
  exec("ncu -u; rake reinstall")
end

task "dev" do
  exec("yarn start")
end

task "build" do
  exec("yarn build")
end

task "test" do
  exec("yarn test")
end

task "test_watch" do
  exec("yarn test_watch")
end

task "lint" do
  exec("yarn lint")
end
