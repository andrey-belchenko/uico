import os
import json
import shutil
import subprocess


source_dir = r"C:\Repos\mygithub\uicomp-test\my-app"
target_dir = r"C:\Repos\mygithub\uicomp\libs"


def npm_publish(folder_path):
    os.chdir(folder_path)
    cmdText = "npm publish"
    res = os.system(cmdText)
    if res != 0:
        raise Exception("Error while executing: " + cmdText)


def install_package(project_path, package_name):
    os.chdir(project_path)
    cmdText = (
        "npm install --registry http://gl.astu.lan/api/v4/projects/108/packages/npm/ "
        + package_name
    )
    res = os.system(cmdText)
    if res != 0:
        raise Exception("Error while executing: " + cmdText)


def grab_package(package_name: str, package_names: list[str]):
    # if new_package_name==None:
    new_dir_name = package_name.replace("\\", "_").replace("/", "_")
    package_path = os.path.join(source_dir, "node_modules", package_name)
    new_package_path = os.path.join(target_dir, new_dir_name)
    os.makedirs(new_package_path, exist_ok=True)
    shutil.rmtree(new_package_path)
    shutil.copytree(package_path, new_package_path)

    new_package_json_path = os.path.join(new_package_path, "package.json")
    with open(new_package_json_path, "r") as f:
        package_data = json.load(f)
    # package_data["name"] = new_package_name

    parts = ["dependencies", "devDependencies"]
    for part in parts:
        if part in package_data:
            for name in package_names:
                deps: dict = package_data[part]
                if name in deps:
                    deps.pop(name)

    with open(new_package_json_path, "w") as f:
        json.dump(package_data, f, indent=2)

    npmrc_cont = """registry=http://gl.astu.lan/api/v4/projects/108/packages/npm/
//gl.astu.lan/api/v4/projects/108/packages/npm/:_authToken=glpat-M1CpxUYSJ3RSuJGXxSEk
always-auth=true"""
    with open(os.path.join(new_package_path, ".npmrc"), "w") as f:
        f.write(npmrc_cont)
    print(new_package_path)


def publish_package(package_name: str):
    new_dir_name = package_name.replace("\\", "_").replace("/", "_")
    new_package_path = os.path.join(target_dir, new_dir_name)
    npm_publish(new_package_path)
    print("Published: " + new_package_path)


def rename_files_and_folders(path, old_text, new_text):
    for dirpath, dirnames, filenames in os.walk(path, topdown=False):
        for dirname in dirnames:
            if old_text in dirname:
                src = os.path.join(dirpath, dirname)
                dst = os.path.join(dirpath, dirname.replace(old_text, new_text))
                os.rename(src, dst)
        for filename in filenames:
            if old_text in filename:
                src = os.path.join(dirpath, filename)
                dst = os.path.join(dirpath, filename.replace(old_text, new_text))
                os.rename(src, dst)


def replace_text_in_files(dir_path, old_text, new_text):
    for foldername, subfolders, filenames in os.walk(dir_path):
        for filename in filenames:
            file_path = os.path.join(foldername, filename)
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    filedata = file.read()
                if old_text in filedata:
                    filedata = filedata.replace(old_text, new_text)
                    with open(file_path, "w", encoding="utf-8") as file:
                        file.write(filedata)
                    print(file_path)
            except:
                pass


packages = [
    "devextreme-quill",
    "devextreme-react",
    "devexpress-diagram",
    "devexpress-gantt",
    "devextreme",
    r"@devexpress/utils",
    r"@devextreme/runtime",
]

new_packages = [
    "dpt-ui-quill",
    "dpt-ui-react",
    "dpt-ext-ui-diagram",
    "dpt-ext-ui-gantt",
    "dpt-ui",
    r"@dpt-ext-ui/utils",
    r"@dpt-ui/runtime",
]


# rename_files_and_folders(target_dir,"devextreme", "dptuicomp")
# rename_files_and_folders(target_dir,"devexpress", "dptuiext")
# replace_text_in_files(target_dir, "devextreme", "dptuicomp")
# replace_text_in_files(target_dir, "devexpress", "dptuiext")

# for item in packages:
#     grab_package(item, packages)

for item in new_packages:
    publish_package(item)


# rename_files_and_folders(target_dir, "dptuicomp", "dpt-ui")
# rename_files_and_folders(target_dir, "dptuiext", "dpt-ext-ui")
# replace_text_in_files(target_dir, "dptuicomp", "dpt-ui")
# replace_text_in_files(target_dir, "dptuiext", "dpt-ext-ui")

# for item in new_packages:
#     install_package(r"C:\Repos\mygithub_alt\uicomp-test\my-app", item)
