from flask_wtf import FlaskForm
from wtforms import StringField

class EditForm(FlaskForm):
    details = StringField('details')
    