from rest_framework import serializers
from event_loop.models import Event, Keyword

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'date',
        )
        model = Event


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'word',
            'events'
        )
        model = Keyword