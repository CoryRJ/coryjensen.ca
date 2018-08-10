const total_hiding = 5;

function open_close(a)
{
    var hid = document.getElementById('hidden_'+a.charAt(8));
    if(hid.style.display == 'block')
    {
        hid.style.display = 'none';
    }
    else
    {
        hid.style.display = 'block';
    }
}


function open_all()
{
    for(var i = 1; i <= total_hiding;i++)
    { 
        var hid = document.getElementById('hidden_'+i);
        hid.style.display = 'block';
    }
}

function close_all()
{
    for(var i = 1; i <= total_hiding;i++)
    { 
        var hid = document.getElementById('hidden_'+i);
        hid.style.display = 'none';
    }
}

function display_none()
{
    for(var i = 1; i <= total_hiding;i++)
    { 
        var hid = document.getElementById('hidden_'+i);
        hid.style.display = 'none';
    }
}
