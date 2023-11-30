from django import forms

class RatingForm(forms.Form):
    rating = forms.IntegerField(min_value=1, max_value=5)                   # Allows the user to rate the recipe from 1 to 5
    comments = forms.CharField(widget=forms.Textarea, required=False)       # Allows the user to leave a comment

