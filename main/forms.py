from django import forms
from .models import Treasure

class TreasureForm(forms.ModelForm):
	# forms.SelectDateWidget
	class Meta:
		model = Treasure
		fields = '__all__'