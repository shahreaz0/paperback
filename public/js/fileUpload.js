FilePond.registerPlugin(
	FilePondPluginFileEncode,
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
);

FilePond.setOptions({
	imageResizeTargetWidth: 100,
	imageResizeTargetHeight: 150,
	imageResizeMode: "force",
});

FilePond.parse(document.body);
