require 'yui/compressor'
require 'sass'

namespace :sameform do
  task :build do
    Dir.mkdir("build") unless File.exists?("build")
    File.open "build/jquery.sameform.min.js", "w" do |file|
      file.puts File.read("HEADER").gsub("#version#", File.read("VERSION").strip)
      file.puts YUI::JavaScriptCompressor.new(:munge => true).compress(File.read("jquery.sameform.js"))
    end
    File.open "build/sameform.css", "w" do |file|
      file.puts Sass::Engine.new(File.read("sameform.sass")).render
    end
  end
end
