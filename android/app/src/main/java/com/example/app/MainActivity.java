package com.example.app;

import com.getcapacitor.BridgeActivity;
import ch.byrds.capacitor.contacts.Contacts

public class MainActivity extends BridgeActivity {
    @override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState)

        //Initializes the Bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>(){{
            add(Contacts.class)
            }
        })
    }
}
