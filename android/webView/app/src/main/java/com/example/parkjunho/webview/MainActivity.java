package com.example.parkjunho.webview;

//import android.support.v7.app.AppCompatActivity;

import android.app.Activity;
import android.os.Bundle;
//import android.view.KeyEvent;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class MainActivity extends Activity {

    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView)findViewById(R.id.webView);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.loadUrl("file:///android_asset/index.html");
//        mWebView.loadUrl("https://goo.gl/jFRd4n");
        mWebView.setWebViewClient(new WebViewClientClass());
        mWebView.setVerticalScrollBarEnabled(true);

        mWebView.getSettings().setLoadWithOverviewMode(true);
        mWebView.getSettings().setUseWideViewPort(true);
    }

    private class WebViewClientClass extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
    }
}

