from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def sample(request):
    if request.method == 'GET':
        # モデルインスタンスを直接シリアライズし、JSONに変換
        profiles_data = [{'id': 1} for profile in [1,2]]
        return Response(profiles_data)