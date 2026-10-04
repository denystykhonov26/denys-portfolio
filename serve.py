#!/usr/bin/env python3
"""Quiet local preview server for the static portfolio."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    address = ("127.0.0.1", 4173)
    print("Portfolio preview: http://127.0.0.1:4173/")
    ThreadingHTTPServer(address, QuietHandler).serve_forever()
