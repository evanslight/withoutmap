from bottle import route, run, template, static_file

@route('/')
def index():
    return template('/home/ubuntu/webserver/web_newest/index.html')

@route('/<filename>')
def index(filename):
    return template('/home/ubuntu/webserver/web_newest/'+filename)


@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='/home/ubuntu/webserver/web_newest/static')

run(host='0.0.0.0', port=8080, debug = True)
