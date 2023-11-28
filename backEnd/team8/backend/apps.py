from django.apps import AppConfig


class BeckendConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "beckend"

"""another webiste says to do it like this:
from django.apps import AppConfig


class RockNRollConfig(AppConfig):
    name = "rock_n_roll"
    verbose_name = "Rock ’n’ roll"
    
    """