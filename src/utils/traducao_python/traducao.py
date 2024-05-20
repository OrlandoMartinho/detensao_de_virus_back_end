from googletrans import Translator, LANGUAGES
import main

def traduzir_frase(frase, idioma):
    
    existencia= [False,False]
    
        
    if idioma in main.controller.codigos_idiomas():
            
         existencia[0]=True
            
        
    if idioma in main.controller.idiomas_correspondentes():
            
            existencia[1]=True
            
    if existencia[1]==True :
        
       i=0    
       while i<len(main.controller.idiomas_correspondentes()):
           
           if idioma == main.controller.idiomas_correspondentes()[i]:
               
               idioma=main.controller.codigos_idiomas()[i].lower()
               
           i=i+1

    if True in existencia:
        
        translator = Translator()

        try:
            traducao = translator.translate(frase, src='auto', dest=idioma)
            return traducao.text
        except Exception as e:
            return f"Erro ao traduzir: {e}"
    else:
        
        return "Idioma inválido"

