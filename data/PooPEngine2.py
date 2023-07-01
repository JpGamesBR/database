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
        return "0.0.1 - PooPEngine2: https://mrjuaumbr.github.io"
    
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

    def draw_text(self,Position: tuple or list,text:str,font: pyg.font or int, color:tuple or list, antialias=False):
        if type(font) == int:
            font = self.fonts[font]
        r = font.render(text,color,antialias)
        r_rect = r.get_rect()
        r_rect.topleft = Position
        self.screen.blit(r,r_rect)
        return r_rect

    def events(self):
        return pyg.event.get()

    def update(self):
        """Update screen"""
        pyg.display.update()