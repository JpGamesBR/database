import pygame as pyg
from pygame.locals import *
import os
from sys import exit
pyg.display.set_mode()
class PooPEngine2():
    def __init__(self,screen:pyg.surface=None) -> None:
        self.ver = self.version()
        self.fonts = []
        self.screen = screen

    def version(self):
        return "0.0.2 - PooPEngine2: https://mrjuaumbr.github.io"
    
    def create_screen(self,size:tuple or list,**kwargs):
        """Create a screen and return"""
        if not self.screen:
            os.environ['SDL_VIDEO_CENTERED'] = '1'
            if kwargs:
                self.screen = pyg.display.set_mode(size,**kwargs)
            else:
                self.screen =pyg.display.set_mode(size)
            return self.screen
        else:
            raise("You already have a screen!")

    def create_sysFont(self,name:str,size:int,bold=False,italic=False) -> pyg.font:
        """Create a font and return"""
        r = pyg.font.SysFont(name, size, bold, italic)
        
        if r in self.fonts:
            raise(f"This font already exists in index: {self.fonts.index(r)}")
        else:
            self.fonts.append(r)
            print(f"Font created in index: {self.fonts.index(r)}")
        return r
    
    def draw_circle(self,Position:tuple or list,color:tuple, radius:int) -> pyg.Rect:
        o = pyg.draw.circle(self.screen,color,Position,radius)
        return o
    
    def load_image(self,path) ->pyg.image:
        i = pyg.image.load(path)
        return i
    
    def draw_image(self,image:str or pyg.image,Position: tuple or list) -> pyg.surface:
        if type(image) == str:
            image = self.load_image(image)
        r = image.get_rect()
        r.topleft = Position
        self.screen.blit(image,r)
        return image

    def resize_surface(self,surface:pyg.surface,size:tuple or list) -> pyg.surface:
        i = pyg.transform.scale(surface,size)
        return i

    def flip_surface(self,surface:pyg.surface,flip_x=False,flip_y=False) -> pyg.surface:
        i = pyg.transform.flip(surface,flip_x,flip_y)
        return i

    def rotate_surface(self,surface:pyg.surface,angle:float) -> pyg.surface:
        i = pyg.transform.rotate(surface,angle)
        return i

    def draw_rect(self,Position:tuple or list,Size:tuple or list, color:tuple) -> pyg.Rect:
        o = pyg.draw.rect(self.screen,color,Rect(Position[0],Position[1],Size[0],Size[1]))
        return o

    def draw_slider(self,Position:tuple or list,Width:int,CurX:int,colors=((0,0,0),(200,200,200))):
        MaxX = Position[0] + Width
        self.draw_rect(Position,(Width,20),colors[0])
        b = self.draw_circle((CurX,Position[1]+10),colors[1],25)
        if b.collidepoint(pyg.mouse.get_pos()):
            if pyg.mouse.get_pressed(3)[0]:
                CurX = pyg.mouse.get_pos()[0]
                if CurX > MaxX:
                    CurX = MaxX
                elif CurX < Position[0]:
                    CurX = Position[0]
        Value = CurX/MaxX
        if Value > 1:
            Value = 1
        elif Value<0:
            Value = 0

        return CurX, Value

    def draw_text(self,Position: tuple or list,text:str,font: pyg.font or int, color:tuple or list,bgcolor=None, antialias=False):
        if type(font) == int:
            font = self.fonts[font]
        if bgcolor:
            r = font.render(text,color,antialias,bgcolor)
        else:
            r = font.render(text,color,antialias)
        r_rect = r.get_rect()
        r_rect.topleft = Position
        self.screen.blit(r,r_rect)
        return r_rect

    def draw_button(self,Position:tuple or list,text:str,font:pyg.font or int, color:tuple or list,bgcolor=None) -> bool:
        if self.draw_text(Position,text,font,color,bgcolor).collidepoint(pyg.mouse.get_pos()):
            if pyg.mouse.get_pressed(3)[0]:
                return True
            else:
                return False
        else:
            return False

    def draw_select(self,Position: tuple or list,items:list or tuple,cur_index:int,font:int or pyg.font,colors=((0,0,0),(200,200,100))):
        if type(font) == int:
            font = self.fonts[font]
        fix = font.size(items[cur_index])[0]
        self.draw_text((Position[0]-fix/4,Position[1]),items[cur_index],font,colors[0],colors[1])
        bback = self.draw_button((Position[0]-fix,Position[1]),"<",font,colors[0],colors[1])
        bnext = self.draw_button((Position[0]+fix,Position[1]),">",font,colors[0],colors[1])
        if bback:
            if cur_index-1<0:
                cur_index=len(items)-1
            else:
                cur_index -=1
        elif bnext:
            if cur_index +1>len(items)-1:
                cur_index = 0
            else:
                cur_index+=1
            
        return cur_index

    def draw_switch(self,Position: tuple or list,font:pyg.font or int,curState:bool,colors=((0,0,0),(200,100,100),(100,100,200))) -> bool:
        tx = ""
        if curState:
            tx = "On"
            C = colors[2]
        else:
            tx = "Off"
            C = colors[1]
        if self.draw_button(Position,tx,font,colors[0],C):
            curState = not curState
            pyg.time.delay(150)
        return curState

    def hex_to_rgb(self,hex):
        rgb = []
        for i in (0, 2, 4):
            decimal = int(hex[i:i+2], 16)
            rgb.append(decimal)
        
        return tuple(rgb)
    
    def rgb_to_hex(self,r, g, b):
        return '#{:02x}{:02x}{:02x}'.format(r, g, b)

    def events(self):
        return pyg.event.get()

    def update(self):
        """Update screen"""
        pyg.display.update()
