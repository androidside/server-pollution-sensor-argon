from app import app, db
from app.models import Reading
from datetime import datetime

#Dictionary with all the symbols that I want to have available in a flask shell session
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Reading':Reading, 'datetime': datetime}

# From command line launch $flask run --host=0.0.0.0