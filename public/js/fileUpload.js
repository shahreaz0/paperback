FilePond.registerPlugin(
	FilePondPluginFileEncode,
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
);

FilePond.setOptions({
	imageResizeTargetWidth: 100,
	imageResizeTargetHeight: 150,
});

FilePond.parse(document.body);
