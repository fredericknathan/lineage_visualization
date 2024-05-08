function Node(name, pv, left, right, children_names, parent = "", children = []) {
    this.value = name;
    this.pv = parseInt(pv);
    this.right = right;
    this.left = left;
    this.children_names = children_names;
    this.parent = parent;
    this.children = children;
    this.isRight = null;
    this.isLeft = null;
}

var global_arr = []

function getTotalPvStart(name) {
    for (var i = 0; i<global_arr.length; i++){
        if (global_arr[i].value == name) {
            left_total = getTotalPv(global_arr[i].left).toLocaleString('en-US')
            right_total = getTotalPv(global_arr[i].right).toLocaleString('en-US')
            document.getElementById('total_left').textContent = `Left: ${left_total}`;
            document.getElementById('total_right').textContent = `Right: ${right_total}`;
            break
        }
    }
    
}

function getTotalPv(root) {
    if (root == null) return 0
    return (root.pv + getTotalPv(root.left) + getTotalPv(root.right))
}

function createTree(arr) {
    var root = arr[0]

    for (var i = 1; i < arr.length; i++){
        traverseNode(arr[i], root);
    }
    console.log(getTotalPv(arr[2]))
    remove();
    try {
        drawGraph(arr);
    } catch {
        console.log("No Input");
    }
}

function remove() {
    var graph = document.querySelector('svg');
    if (graph) { graph.parentElement.removeChild(graph) };

}

function insertNode(node, root, isLeft) {
    if (isLeft) {
        root.children.push(node);
        node.parent = root
        root.left = node
    }

    else {
        root.children.push(node);
        node.parent = root
        root.right = node
    }
}

function traverseNode(node, root) {
    if (root == null) { return }

    if (root.children_names != null){
        if (root.children_names[0] == node.value) {
            insertNode(node, root, true);
            return
        }
        else if (root.children_names[1] == node.value) {
            insertNode(node, root, false);
            return
        }
    }

    traverseNode(node, root.left);
    traverseNode(node, root.right);
}

function createNodes(list) {
    new_list = [];

    for (var i = 0; i < list.length; i += 3) {
        var members = list[i+2].split(';')
        
        if (members.length == 1) members = null;

        new_list.push(new Node(list[i], list[i+1], null, null, members))
        if (i + 3 > list.length) break
    }

    createTree(new_list)

    global_arr = new_list

    return new_list
}