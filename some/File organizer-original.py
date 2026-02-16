'''File organizer'''
import tkinter as tk
from tkinter import filedialog
import os, shutil

root = tk.Tk()
root.title("File organizer")
root.geometry("400x250")
root.config(bg="#000000")

status_var = tk.StringVar(value="Ready to organize")
tk.Label(root,
         textvariable=status_var,
         bg='#111111',
         fg="#0ff",
         font=('Arial', 14, 'bold'),
         height=2).pack(fill="x", padx=10, pady=20)

Types = {
    'Images': {'.jpg', '.png'},
    'Docs': {'.pdf', '.doc'},
    'Videos': {'.mp4', '.mov'},
    'Audio': {'.mp3', '.wav'},
    'Code': {'.py', '.html'}
}

def organize_files(event=None):
    folder = filedialog.askdirectory()
    if not folder:
        return

    count = 0
    for file in os.listdir(folder):
        full_path = os.path.join(folder, file)
        if not os.path.isfile(full_path):
            continue

        ext = os.path.splitext(file)[1].lower()
        for category, extensions in Types.items():
            if ext in extensions:
                target_dir = os.path.join(folder, category)
                os.makedirs(target_dir, exist_ok=True)
                shutil.move(full_path, os.path.join(target_dir, file))
                count += 1
                break

    status_var.set(f"Moved {count} files!! 😊")

frame = tk.Frame(root, bg='#000')
frame.pack(pady=20)

btn_widget = tk.Label(frame,
                      text="SELECT FOLDER",
                      font=('Arial', 14, 'bold'),
                      bg="#eeb701",
                      fg="white",
                      width=20,
                      height=2,
                      relief='flat')
btn_widget.bind("<Button-1>", organize_files)
btn_widget.pack()

tk.Label(root,
         text="Sorts Images, Docs, Videos, Audio",
         bg="#000000",
         fg="white").pack(pady=10)

root.mainloop()
