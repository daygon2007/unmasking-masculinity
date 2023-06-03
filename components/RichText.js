export default function RichText({ block }) {
    const data = JSON.parse(block.dynamicContent);
    console.log(data);

    const {
        section_id,
        background_color,
        section_class,
        section_title,
        section_title_class,
        content
    } = data;
    return (
        <>
            <div className={`rich-text ${background_color}`} id={section_id}>
                <div className={`container ${section_class}`}>
                    <div className="row py-5">
                        {section_title ? (
                            <div className="col-12 mb-5">
                                <h2 className={`mt-0 text-center ${section_title_class}`}>{section_title}</h2>
                            </div>
                        ) : (null)}
                        <div className="col-12" dangerouslySetInnerHTML={{__html: content}}>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}