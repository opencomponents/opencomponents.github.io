---
sidebar_position: 5
---

# Publishing to a registry

You will need an online registry connected to a library to do that. The only requisite is that a component with the same name and version cannot be already existing on that registry.

```sh
# you have to do the registry config first, just once
oc registry add http://my-components-registry.mydomain.com

# then, ship it
oc publish hello-world/
```

Now, it should be there at `http://my-components-registry.mydomain.com/hello-world`.
