#!/usr/bin/env python3

import tkinter as tk
import os
from tkinter import filedialog

class FileManager:
    def __init__(self):
        self.folder_path = "./media"
        self.root = tk.Tk()
        self.root.title("File Manager")
        
        self.listbox = tk.Listbox(self.root)
        self.listbox.pack(fill=tk.BOTH, expand=True)
        
        self.add_button = tk.Button(self.root, text="Add", command=self.add_file)
        self.add_button.pack(side=tk.LEFT, padx=5, pady=5)
        
        self.delete_button = tk.Button(self.root, text="Delete", command=self.delete_file)
        self.delete_button.pack(side=tk.LEFT, padx=5, pady=5)
        
        self.rename_button = tk.Button(self.root, text="Rename", command=self.rename_file)
        self.rename_button.pack(side=tk.LEFT, padx=5, pady=5)
        
        self.restart_button = tk.Button(self.root, text="Restart server", command=self.restart_server)
        self.restart_button.pack(side=tk.LEFT, padx=5, pady=5)
        
        self.update_listbox()
        self.root.mainloop()
        
    def update_listbox(self):
        self.listbox.delete(0, tk.END)
        for item in os.listdir(self.folder_path):
            self.listbox.insert(tk.END, item)
        
    def add_file(self):
        file_path = filedialog.askopenfilename(initialdir = "/home/user/Desktop/")
        if file_path:
            os.rename(file_path, self.folder_path + "/" + file_path.split("/")[-1])
            self.update_listbox()
        
    def delete_file(self):
        selected_item = self.listbox.get(self.listbox.curselection()[0])
        os.remove(self.folder_path + "/" + selected_item)
        self.update_listbox()
        
    def rename_file(self):
        selected_item = self.listbox.get(self.listbox.curselection()[0])
        new_name = tk.filedialog.asksaveasfilename(initialdir=self.folder_path, initialfile=selected_item)
        if new_name:
            os.rename(self.folder_path + "/" + selected_item, new_name)
            self.update_listbox()
            
    def restart_server(self):
        password = tk.simpledialog.askstring("Restart server", "Enter password:", show='*')
        if password:
            os.system(f"echo {password} | sudo -S service nginx restart")

file_manager = FileManager()
