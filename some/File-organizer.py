import os
import shutil
import json
import threading
import tkinter as tk
from tkinter import ttk, filedialog, simpledialog, messagebox
from typing import Dict, List, Tuple

# ---------- Configuration ----------
BACKGROUND_COLOR = "#0f0f0f"
ACCENT_COLOR = "#f5b301"
SETTINGS_FILE = "settings.json"

# ---------- Data Management ----------
move_history: List[Tuple[str, str]] = []

def load_settings():
    if os.path.exists(SETTINGS_FILE):
        try:
            with open(SETTINGS_FILE, "r") as file:
                return json.load(file)
        except: pass
    return {
        "categories": {
            "Images": [".jpg", ".png", ".jpeg"],
            "Docs": [".pdf", ".doc", ".txt"],
            "Audio": [".mp3", ".wav"]
        }
    }

def save_settings(settings):
    with open(SETTINGS_FILE, "w") as file:
        json.dump(settings, file, indent=2)

settings_data = load_settings()

# ---------- Settings Editor (Fully Rectified) ----------
def open_settings_window():
    win = tk.Toplevel(root)
    win.title("Manage Rules")
    win.geometry("600x450")
    win.config(bg="#1a1a1a")
    win.grab_set()  # Keeps the focus on this window

    main_frame = tk.Frame(win, bg="#1a1a1a")
    main_frame.pack(fill="both", expand=True, padx=20, pady=20)

    # --- LEFT: Categories ---
    left_frame = tk.Frame(main_frame, bg="#1a1a1a")
    left_frame.pack(side="left", fill="both", expand=True)

    tk.Label(left_frame, text="1. Click a Category", bg="#1a1a1a", fg=ACCENT_COLOR, font=("Arial", 10, "bold")).pack(anchor="w")
    
    # exportselection=False is CRITICAL here so selection doesn't disappear when clicking buttons
    cat_list = tk.Listbox(left_frame, bg="#222", fg="white", bd=0, highlightthickness=1, 
                          selectbackground=ACCENT_COLOR, selectforeground="black", exportselection=False)
    cat_list.pack(fill="both", expand=True, pady=5)

    # --- RIGHT: Extensions ---
    right_frame = tk.Frame(main_frame, bg="#1a1a1a")
    right_frame.pack(side="right", fill="both", expand=True, padx=(20, 0))

    tk.Label(right_frame, text="2. File Extensions", bg="#1a1a1a", fg=ACCENT_COLOR, font=("Arial", 10, "bold")).pack(anchor="w")
    
    ext_list = tk.Listbox(right_frame, bg="#222", fg="white", bd=0, highlightthickness=1, 
                          selectbackground="#00ffd5", selectforeground="black", exportselection=False)
    ext_list.pack(fill="both", expand=True, pady=5)

    # --- Functions ---
    def refresh_cats():
        cat_list.delete(0, tk.END)
        for c in sorted(settings_data["categories"].keys()):
            cat_list.insert(tk.END, c)

    def refresh_exts(event=None):
        ext_list.delete(0, tk.END)
        sel = cat_list.curselection()
        if sel:
            cat = cat_list.get(sel[0])
            for e in sorted(settings_data["categories"][cat]):
                ext_list.insert(tk.END, e)
        else:
            ext_list.insert(tk.END, "← Select a category")

    def add_cat():
        name = simpledialog.askstring("New Category", "Enter folder name:", parent=win)
        if name:
            name = name.strip().capitalize()
            if name not in settings_data["categories"]:
                settings_data["categories"][name] = []
                save_settings(settings_data)
                refresh_cats()

    def rem_cat():
        sel = cat_list.curselection()
        if not sel: return
        cat = cat_list.get(sel[0])
        if messagebox.askyesno("Confirm", f"Delete category '{cat}'?", parent=win):
            del settings_data["categories"][cat]
            save_settings(settings_data)
            refresh_cats()
            ext_list.delete(0, tk.END)

    def add_ext():
        sel = cat_list.curselection()
        if not sel: 
            messagebox.showwarning("Selection Required", "Please click a category on the left first!", parent=win)
            return
        cat = cat_list.get(sel[0])
        ext = simpledialog.askstring("New Extension", "Example: .mp4", parent=win)
        if ext:
            ext = ext.strip().lower()
            if not ext.startswith("."): ext = "." + ext
            if ext not in settings_data["categories"][cat]:
                settings_data["categories"][cat].append(ext)
                save_settings(settings_data)
                refresh_exts()

    def rem_ext():
        c_sel = cat_list.curselection()
        e_sel = ext_list.curselection()
        if not c_sel or not e_sel: return
        cat = cat_list.get(c_sel[0])
        ext = ext_list.get(e_sel[0])
        settings_data["categories"][cat].remove(ext)
        save_settings(settings_data)
        refresh_exts()

    # --- Buttons Layout ---
    cat_btn_f = tk.Frame(left_frame, bg="#1a1a1a")
    cat_btn_f.pack(fill="x")
    tk.Button(cat_btn_f, text="+ Add", command=add_cat, bg="#333", fg="white").pack(side="left", expand=True, fill="x", padx=2)
    tk.Button(cat_btn_f, text="- Remove", command=rem_cat, bg="#333", fg="white").pack(side="left", expand=True, fill="x", padx=2)

    ext_btn_f = tk.Frame(right_frame, bg="#1a1a1a")
    ext_btn_f.pack(fill="x")
    tk.Button(ext_btn_f, text="+ Add", command=add_ext, bg="#333", fg="white").pack(side="left", expand=True, fill="x", padx=2)
    tk.Button(ext_btn_f, text="- Remove", command=rem_ext, bg="#333", fg="white").pack(side="left", expand=True, fill="x", padx=2)

    # --- BINDING ---
    cat_list.bind("<<ListboxSelect>>", refresh_exts)
    refresh_cats()

# ---------- Main App Logic ----------
def log(message, level="INFO"):
    colors = {"INFO": "#00ffd5", "WARN": "#f5b301", "ERROR": "#ff4444"}
    log_text.configure(state="normal")
    log_text.insert("end", f"[{level}] {message}\n", level)
    log_text.tag_config(level, foreground=colors.get(level, "#ccc"))
    log_text.see("end")
    log_text.configure(state="disabled")

def organize_files(folder: str):
    files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
    if not files:
        status_text.set("No files found")
        return

    move_history.clear()
    count = 0
    for index, filename in enumerate(files):
        ext = os.path.splitext(filename)[1].lower()
        for category, extensions in settings_data["categories"].items():
            if ext in extensions:
                dest_dir = os.path.join(folder, category)
                os.makedirs(dest_dir, exist_ok=True)
                shutil.move(os.path.join(folder, filename), os.path.join(dest_dir, filename))
                move_history.append((os.path.join(dest_dir, filename), os.path.join(folder, filename)))
                log(f"Moved {filename} → {category}", "INFO")
                count += 1
                break
        progress_var.set((index + 1) / len(files) * 100)
        root.update_idletasks()
    
    status_text.set(f"Completed: {count} files organized")

def choose_folder():
    folder = filedialog.askdirectory()
    if folder:
        status_text.set("Organizing...")
        threading.Thread(target=organize_files, args=(folder,), daemon=True).start()

def undo():
    if not move_history: return log("Nothing to undo", "WARN")
    for new, old in reversed(move_history):
        if os.path.exists(new): shutil.move(new, old)
    move_history.clear()
    status_text.set("Undo Complete")
    log("Reverted last action", "INFO")

# ---------- Main Window ----------
root = tk.Tk()
root.title("File Organizer Pro")
root.config(bg=BACKGROUND_COLOR)

if os.name == 'nt': root.state('zoomed')
else: root.attributes('-zoomed', True)

status_text = tk.StringVar(value="System Ready")
progress_var = tk.DoubleVar()

# Header
tk.Label(root, textvariable=status_text, bg="#1a1a1a", fg="#00ffd5", font=("Segoe UI", 16, "bold"), height=2).pack(fill="x")
ttk.Progressbar(root, variable=progress_var, maximum=100).pack(fill="x", padx=50, pady=10)

# Dashboard
ctrl_frame = tk.Frame(root, bg=BACKGROUND_COLOR)
ctrl_frame.pack(expand=True)

btn_style = {"font": ("Segoe UI", 12, "bold"), "width": 35, "height": 2, "bd": 0, "cursor": "hand2"}
tk.Button(ctrl_frame, text="📁 SELECT FOLDER TO ORGANIZE", bg=ACCENT_COLOR, fg="black", command=choose_folder, **btn_style).pack(pady=10)
tk.Button(ctrl_frame, text="⏪ UNDO RECENT CHANGES", bg="#333", fg="white", command=undo, **btn_style).pack(pady=10)
tk.Button(ctrl_frame, text="⚙ SETTINGS & RULES", bg="#222", fg="#888", command=open_settings_window, **btn_style).pack(pady=10)

# Console
log_text = tk.Text(root, bg="#111", fg="#ccc", font=("Consolas", 10), height=8, state="disabled", bd=0)
log_text.pack(fill="x", padx=20, pady=20)

root.mainloop()