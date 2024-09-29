import torch
from min_dalle import MinDalle
from PIL import Image




model = MinDalle(
    models_root='./pretrained',
    dtype=torch.float32,
    device='cpu',
    is_mega=True, 
    is_reusable=True
) 
image = model.generate_image(
    text='insert text here',
    seed=-1,
    grid_size=1,
    is_seamless=False,
    temperature=1,
    top_k=256,
    supercondition_factor=32,
    is_verbose=False
)

image.show()
