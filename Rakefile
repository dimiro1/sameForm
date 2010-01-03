require 'yui/compressor'
require 'less'

namespace :sameform do
  task :build do
    Dir.mkdir("build") unless File.exists?("build")
    File.open "build/jquery.sameform.js", "w" do |file|
      file.puts File.read("dev/HEADER").gsub("#version#", File.read("dev/VERSION").strip)
      file.puts File.read("dev/select.js")
      file.puts File.read("dev/radio.js")
      file.puts File.read("dev/checkbox.js")
      file.puts File.read("dev/form.js")
    end
    File.open "build/jquery.sameform.min.js", "w" do |file|
      file.puts File.read("dev/HEADER").gsub("#version#", File.read("dev/VERSION").strip)
      file.puts YUI::JavaScriptCompressor.new(:munge => true).compress(File.read("build/jquery.sameform.js"))
    end
    File.open "build/sameform.css", "w" do |file|
      file.puts File.read("dev/HEADER").gsub("#version#", File.read("dev/VERSION").strip)
      file.puts Less.parse(File.read("dev/sameform.less"))
    end
    File.open "build/sameform.min.css", "w" do |file|
      file.puts File.read("dev/HEADER").gsub("#version#", File.read("dev/VERSION").strip)
      file.puts YUI::CssCompressor.new.compress(File.read("build/sameform.css"))
    end
  end
end
