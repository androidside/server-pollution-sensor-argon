from app import app, db
from app.models import Reading
from datetime import datetime
from multiprocessing import Process
import os
from werkzeug.serving import run_simple


#Dictionary with all the symbols that I want to have available in a flask shell session
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Reading':Reading, 'datetime': datetime}

os.system('tasklist | findstr py')
#os.system('taskkill.exe /F /IM "python*" /T')
if __name__== "__main__":
#     app.run(host='0.0.0.0', port=8080, app, debug=True, use_reloader=True)
    run_simple('localhost', 5000, app, use_reloader=True)


# From command line launch $flask run --host=0.0.0.0